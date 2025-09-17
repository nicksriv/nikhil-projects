//
//  Socket.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/21/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import Foundation
import UIKit

class Socket {

    static var socket: SocketIOClient!
    var contacts: [Contact]!
 
    init(token: String){
        var dict = ["auth_token": token]
        var opts = ["connectParams": dict]
        Socket.socket = SocketIOClient(socketURL: "http://ci.appsriv.in", opts: opts)
        self.contacts = [Contact]()
        self.addHandlers()
        Socket.socket.connect()
    }
    
    func addHandlers() {
        Socket.socket.on("connected users") { data, ack in
            println(data)
            
            self.loadContacts(data! as NSArray)
            NSNotificationCenter.defaultCenter().postNotificationName("ContactsScreen", object: nil)
            return
        }
        Socket.socket.on("error") { data, ack in
            print("hello error")
            println(data)
            return
        }
        Socket.socket.on("private chat") { data, ack in
            println(data!)
            self.chatMessages(data! as NSArray)
            NSNotificationCenter.defaultCenter().postNotificationName("PrivateConversation", object: nil)
            return
        }
        
        Socket.socket.onAny {println("Got event: \($0.event), with items: \($0.items)")}
    }
    
    func loadContacts(data: NSArray){
        
        for contact in data{
            
            for element: AnyObject in JSONParseArray(contact as! String) {
                let name = element["name"] as? String
                let hash = element["hash"] as? String
                println("Name: \(name!), Hash: \(hash!)")
                
                var newContact = Contact(name: name!, hash: hash!)
                self.contacts.append(newContact)
                println("contact added \(self.contacts.count)")
            }
            
        }
        
    }
    
    func chatMessages(data: NSArray){
        
        for Message in data{
            
            var element = JSONParseArrays(Message as! String)
            let hash = element["hash"] as? String
            let msg = element["msg"] as? String
            println("MSG: \(msg!), Hash: \(hash!)")
            
            for contact in self.contacts{
                if contact.hash == hash{
                    contact.chat.send(msg!, sender: true)
                }
            }
            
            
        }
        
    }
    
    
    func JSONParseArray(string: String) -> [AnyObject]{
        if let data = string.dataUsingEncoding(NSUTF8StringEncoding){
            
            var error = NSErrorPointer()
            
            if let dict = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: error)  as? [AnyObject] {
                return dict
                
            }
        }
        return [AnyObject]()
    }
    
    func JSONParseArrays(string: String) -> NSDictionary{
        if let data = string.dataUsingEncoding(NSUTF8StringEncoding){
            
            var error = NSErrorPointer()
            
            if let dict = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: error)  as? NSDictionary {
                return dict
                
            }
        }
        return NSDictionary()
    }
    

}