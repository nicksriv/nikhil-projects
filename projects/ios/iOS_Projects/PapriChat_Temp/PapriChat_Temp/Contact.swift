//
//  Contact.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/19/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
import UIKit

class Contact{
    
    var name: String!
    var hash: String!
    var chat: Chat!
    

    init(){
      
    }
    
    init(data : NSDictionary){
      
        self.name = Utils.getStringFromJSON(data, key: "name")
        self.hash = Utils.getStringFromJSON(data, key: "hash")
        self.chat = Chat()
        
    }
    
    init(name: String, hash: String){
        self.name = name
        self.hash = hash
        self.chat = Chat()
    }
    
    func addChat(msg: String, sender: Bool){
      self.chat.send(msg, sender: sender)
    }
    
}