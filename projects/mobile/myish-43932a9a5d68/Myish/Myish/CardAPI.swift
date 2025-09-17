//
//  CardAPI.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/22/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class CardAPI{
    
    var cards: [CardData]!
    var index: Int!
    var userid: String!
    
    init(){
        self.cards = [CardData]()
        //CardReload()
        self.index = 0
        //self.userid = userid
    }
    
    func loadCards(cardUrl: String, completion: (([CardData]) -> Void)!) {

        self.cards = [CardData]()
        let urlString = cardUrl
        
        print("NSURLSession: \(urlString)")
        let session = NSURLSession.sharedSession()
        let cardsUrl = NSURL(string: urlString)

          let task = session.dataTaskWithURL(cardsUrl!){
            
            (data, response, error) -> Void in
            
            if error != nil {
                
                print(error!.description)
                print(error!.localizedDescription)
            } else {

                print("Begin Serialization: ")
                print(data!.length)
                
                
                let cardsDataArray = try! NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions.MutableContainers) as! Array<NSDictionary>
                
                let cardDictionary = cardsDataArray
                //var cardCount = cardsDataArray.count
                //var cards = [CardData]()
                print(cardDictionary.count)
                
                for card in cardDictionary{

                    let card = CardData(data:card as NSDictionary )

                    print(card.title!)
                    //if(card.status == "1"){
                    
                        print("ad added \(self.cards.count)")
                    if card.imageURL != ""{
                        print("card added \(self.cards.count)")
                        print("image added \(card.imageURL!)")
                        self.cards.append(card as CardData)
                    }
                    //}

                }
                
                let priority = DISPATCH_QUEUE_PRIORITY_DEFAULT
                dispatch_async(dispatch_get_global_queue(priority, 0)) {
                    dispatch_async(dispatch_get_main_queue()) {
                        
                        completion(self.cards)
                    }
                }
                
            }
        }
        
        task.resume()
        
    }
    
}