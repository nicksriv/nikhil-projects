import _get from "lodash.get";

const commonParsers = {};

commonParsers.blogs = (res) => {
  if (res && res.response) {
    res = res.response;
  }
  if (!res) {
    return [];
  }

  return res.map((e) => ({
    imageUrl: _get(e, "image", null),
    title: _get(e, "title", null),
    description: _get(e, "description", ""),
    readMoreLink: _get(e, "link", ""),
    author: _get(e, "author", 1),
  }));
};

commonParsers.faqListParser = (res) => {
  if (res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }

  const handleFaq = (data) => {
    if (data.length) {
      return data.map((item) => {
        let faqArray = {
          id: _get(item, "id", ""),
          faqTitle: _get(item, "faqTitle", ""),
          faqDescription: _get(item, "faqDescription", ""),
        };
        return faqArray;
      });
    }
    return [];
  };
  return res.map((e) => ({
    id: _get(e, "id", ""),
    faqcategoryName: _get(e, "faqcategoryName", ""),
    faqs: handleFaq(_get(e, "faqs", [])),
  }));
};

commonParsers.notificationListParser = (res) => {
  if (res && res.content) {
    res = res.content;
  }
  if (!res) {
    return [];
  }
  return res.map((e) => ({
    id: _get(e, "id", null),
    notificationTitle: _get(e, "notificationTitle", null),
    notificationDescription: _get(e, "notificationDescription", ""),
    date: _get(e, "date", ""),
  }));
};

export { commonParsers };
