package com.wavelabs.auditing.service.auditing;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.codecs.BsonTypeClassMap;
import org.bson.codecs.DocumentCodec;
import org.bson.codecs.configuration.CodecRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.changestream.ChangeStreamDocument;
import com.mongodb.client.model.changestream.OperationType;

@Service
public class MultipleConnectionAuidtingService {

	private Logger LOGGER = LoggerFactory.getLogger(MultipleConnectionAuidtingService.class);

	@Autowired
	@Qualifier("primaryMongoTemplate")
	private MongoTemplate dataTemplate;

	@Autowired
	@Qualifier("secondaryMongoTemplate")
	private MongoTemplate auditingTemplate;

	public void startAuditing() {
		MongoDatabase mongoDatabase = auditingTemplate.getDb();
		MongoIterable<String> listCollectionNames = mongoDatabase.listCollectionNames();
		if (!isCollectionExisits(listCollectionNames)) {
			mongoDatabase.createCollection("auditing-details");
		}
		dataTemplate.getDb().watch().forEach(document -> {
			String collectionName = document.getNamespace() != null
					&& document.getNamespace().getCollectionName() != null ? document.getNamespace().getCollectionName()
							: "";
			if (!collectionName.equals("authentication-auditing-details")) {
				LOGGER.info("Collection Name :" + document.getNamespace().getCollectionName());
				LOGGER.info("Collection Name :" + document.getFullDocument());
				LOGGER.info("Collection Name :" + document.getOperationType().name());
				String oldDocument = "";
				Document changedDocument = toDocument(document);
				if (document.getOperationType() != OperationType.INSERT) {
					Query query = getQuery(document.getFullDocument().get("_id").toString(),
							document.getNamespace().getCollectionName());
					LOGGER.info("Query : " + query.toString());
					try {
						List<Document> find = auditingTemplate.find(query, Document.class, "auditing-details");
						if (!find.isEmpty()) {
							oldDocument = find.get(0).getString("newDocument");
						}
					} catch (Exception ex) {
						ex.printStackTrace();
					}
				}
				if (!oldDocument.equals(changedDocument.getString("newDocument"))) {
					changedDocument.put("oldDocument", oldDocument);
					auditingTemplate.insert(changedDocument, "auditing-details");
				}
			}
		});
	}

	private boolean isCollectionExisits(MongoIterable<String> listCollectionNames) {
		MongoCursor<String> cursor = listCollectionNames.cursor();
		while (cursor.hasNext()) {
			String next = cursor.next();
			if (next.equals("auditing-details")) {
				return true;
			}
		}
		return false;
	}

	private Document toDocument(ChangeStreamDocument<Document> changeDoc) {
		CodecRegistry codecRegistry = MongoClientSettings.getDefaultCodecRegistry();
		final DocumentCodec codec = new DocumentCodec(codecRegistry, new BsonTypeClassMap());
		Document document = new Document();
		document.put("collectionName", changeDoc.getNamespace().getCollectionName());
		document.put("documentId", changeDoc.getFullDocument().get("_id").toString());
		document.put("newDocument", changeDoc.getFullDocument().toJson(codec));
		document.put("oldDocument", "");
		document.put("createdAt", Instant.now());
		document.put("operation", changeDoc.getOperationType().name());
		return document;
	}

	private Query getQuery(String id, String tableName) {
		Query query = new Query();
		Sort sort = Sort.by(Direction.DESC, "createdAt");
		if (id != null && !id.isEmpty()) {
			query.addCriteria(new Criteria("documentId").is(id));
		}
		if (tableName != null && !tableName.isEmpty()) {
			query.addCriteria(new Criteria("collectionName").is(tableName));
		}
		query.with(sort);
		int size = 1;
		query.with(Pageable.ofSize(size).withPage(0));
		query.collation(Collation.of("en").strength(Collation.ComparisonLevel.secondary()));
		return query;
	}

}
