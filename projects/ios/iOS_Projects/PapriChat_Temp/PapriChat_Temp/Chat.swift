//
//  Chat.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/23/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation

class Chat {
    var conversation:[String]!
    var sender: [Bool]!
    
    init(){
        self.conversation = [String]()
        self.sender = [Bool]()
    }
    
    func send(msg: String, sender: Bool){
        self.conversation.append(msg)
        self.sender.append(sender)
    }
}