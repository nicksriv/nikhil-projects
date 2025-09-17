//
//  subNavViewController.swift
//  myDrawer
//
//  Created by Dignitas Digital on 7/15/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit

class subNavViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet var subTableView: UITableView!
    var category = String()
    var splitArray = [String]()
    var xollywood: String = ""
    override func viewDidLoad() {
        super.viewDidLoad()
        // println(xollywood)
        splitArray = xollywood.characters.split{$0 == ","}.map { String($0) }
        print(splitArray)
        print(category)
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //   println(splitArray.count)
        return splitArray.count
        
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("subNavCell", forIndexPath: indexPath) 
        
        if let textLabel = cell.viewWithTag(2) as? UILabel {
            textLabel.text = splitArray[indexPath.row]
            // println(splitArray[indexPath.row])
        }
        
        return cell
        
    }
    
    
    
}
