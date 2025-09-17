//
//  ChatContactsViewControllerTableViewController.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/16/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class ChatContactsViewController: UITableViewController{
    
    var contacts: [Contact]!
    var url: String!
    var port: String!
    var auth: String!
    var socket:Socket!
    var name:String?
    var resetAck: AckEmitter?
   // var contactList: [NSDictionary]!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.title = "Contacts"
        //contactList = [NSDictionary]()
        //self.contacts = [Contact]()
        self.url = "http://52.6.88.205/"
        self.port = "80"
        self.socket = Socket(token: auth)
//        var dict = ["auth_token": auth]
//        var opts = ["connectParams": dict]
//        Socket.socket = SocketIOClient(socketURL: "http://ci.appsriv.in", opts: opts)
//        self.addHandlers()
//        Socket.socket.connect()
        
         NSNotificationCenter.defaultCenter().addObserver(self, selector: "ReloadData:", name:"ContactsScreen", object: nil)
    }
    
    
    deinit{
        NSNotificationCenter.defaultCenter().removeObserver(self, name: "ContactsScreen", object: nil)
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }
    
    func ReloadData(notification: NSNotification){
        tableView.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.socket.contacts.count
    }
    
//    func addHandlers() {
//        Socket.socket.on("connected users") { data, ack in
//            println(data)
//            self.contacts = [Contact]()
//            self.loadContacts(data! as NSArray)
//            self.tableView.reloadData()
//            return
//        }
//        Socket.socket.on("error") { data, ack in
//            print("hello error")
//            println(data)
//            return
//        }
//        Socket.socket.on("private chat") { data, ack in
//            println(data!)
//            self.chatMessages(data! as NSArray)
//            NSNotificationCenter.defaultCenter().postNotificationName("PrivateConversation", object: nil)
//            
//            //self.tableView.reloadData()
//            return
//        }
//
//      Socket.socket.onAny {println("Got event: \($0.event), with items: \($0.items)")}
//    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("ContactsCell", forIndexPath: indexPath) as! UITableViewCell
        
        var lab = cell.viewWithTag(100) as! UILabel
        lab.text = self.socket.contacts[indexPath.row].name

        return cell
    }
    
//    func loadContacts(data: NSArray){
//            
//            for contact in data{
//        
//        for element: AnyObject in JSONParseArray(contact as! String) {
//            let name = element["name"] as? String
//            let hash = element["hash"] as? String
//            println("Name: \(name!), Hash: \(hash!)")
//            
//            var newContact = Contact(name: name!, hash: hash!)
//            self.contacts.append(newContact)
//            println("contact added \(self.contacts.count)")
//        }
//        
//        }
//
//    }
//    
//    func chatMessages(data: NSArray){
//        
//        for Message in data{
//            
//            var element = JSONParseArrays(Message as! String)
//            let hash = element["hash"] as? String
//            let msg = element["msg"] as? String
//            println("MSG: \(msg!), Hash: \(hash!)")
//            
//            for contact in contacts{
//                if contact.hash == hash{
//                    contact.chat.send(msg!, sender: true)
//                }
//            }
//            
//
//        }
//        
//    }
//    
//    
//    func JSONParseArray(string: String) -> [AnyObject]{
//        if let data = string.dataUsingEncoding(NSUTF8StringEncoding){
//            
//            var error = NSErrorPointer()
//            
//            if let dict = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: error)  as? [AnyObject] {
//            return dict
//                
//              }
//        }
//        return [AnyObject]()
//    }
//    
//    func JSONParseArrays(string: String) -> NSDictionary{
//        if let data = string.dataUsingEncoding(NSUTF8StringEncoding){
//            
//            var error = NSErrorPointer()
//            
//            if let dict = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: error)  as? NSDictionary {
//                return dict
//                
//            }
//        }
//        return NSDictionary()
//    }
//    



    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return NO if you do not want the item to be re-orderable.
        return true
    }
    */

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        
        if segue.identifier == "ChatScreen" {
            let ChatScreen = segue.destinationViewController as! ChatTableViewController
            let myIndexPath = self.tableView.indexPathForSelectedRow()
            let section = myIndexPath?.section
            var row = myIndexPath?.row
            ChatScreen.indexOfContact = row
            
            ChatScreen.socket = self.socket
            
            
        }
        
    }


}
