//
//  ChatTableViewController.swift
//  PapriChat_Temp
//
//  Created by Nikhil Srivastava on 7/19/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit

class ChatTableViewController: UIViewController, UITableViewDelegate, UITextFieldDelegate {
    
//    var contact: Contact!
//    var flag: Bool!
//    var msgTxt: String!
    var socket:Socket!
    var indexOfContact: Int!
    
    @IBOutlet weak var sendMsg: UITextField!
    @IBOutlet weak var stableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        self.stableView.delegate = self
        self.sendMsg.delegate = self
        self.sendMsg.backgroundColor = UIColor.lightGrayColor()
        self.navigationController?.title = self.socket.contacts[self.indexOfContact].name
        NSNotificationCenter.defaultCenter().addObserver(self, selector: "ReloadData:", name:"PrivateConversation", object: nil)
        
    }
    
    deinit{
        NSNotificationCenter.defaultCenter().removeObserver(self, name: "PrivateConversation", object: nil)
        NSNotificationCenter.defaultCenter().removeObserver(self)
    }
    
    func ReloadData(notification: NSNotification){
        self.stableView.reloadData()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }

    // MARK: - Table view data source

    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        // #warning Potentially incomplete method implementation.
        // Return the number of sections.
        return 1
    }

    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete method implementation.
        // Return the number of rows in the section.
        return self.socket.contacts[self.indexOfContact].chat.conversation.count
    }

   
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        if self.socket.contacts[self.indexOfContact].chat.sender[indexPath.row] == true {
        let cell = tableView.dequeueReusableCellWithIdentifier("YourChat", forIndexPath: indexPath) as! UITableViewCell

        
        var lab = cell.viewWithTag(300) as! UILabel
            
        cell.backgroundColor = UIColor.lightGrayColor()
        
        lab.text = self.socket.contacts[self.indexOfContact].chat.conversation[indexPath.row]

        return cell
        }
        
        else {
            let cell = tableView.dequeueReusableCellWithIdentifier("MyChat", forIndexPath: indexPath) as! UITableViewCell
            
            
            var lab = cell.viewWithTag(200) as! UILabel
            
            //cell.backgroundColor = UIColor.blackColor()
            //lab.textColor = UIColor.whiteColor()
            
            lab.text = self.socket.contacts[self.indexOfContact].chat.conversation[indexPath.row]
            
            return cell
        }
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        var msg = self.sendMsg.text
        var emitMsg = "({\"hash\":\"\(self.socket.contacts[self.indexOfContact].hash)\",\"msg\":\"\(msg)\"})"
        
        Socket.socket.emit("private chat", emitMsg)
        self.socket.contacts[self.indexOfContact].chat.send(msg, sender: false)
        self.sendMsg.text = ""
        textField.resignFirstResponder()
        self.stableView.reloadData()
        return false
    }
    
    

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

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using [segue destinationViewController].
        // Pass the selected object to the new view controller.
    }
    */

}
