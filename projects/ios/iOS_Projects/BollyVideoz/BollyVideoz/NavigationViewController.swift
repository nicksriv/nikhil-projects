//
//  NavigationViewController.swift
//  myDrawer
//
//  Created by Dignitas Digital on 7/15/15.
//  Copyright (c) 2015 Dignitas Digital. All rights reserved.
//

import UIKit

class NavigationViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet var NavTableView: UITableView!
    let api = NavAPI()
    //  var menuItem:[String] = ["Bolly","Holly"]
    var links : [NavData]!
    override func viewDidLoad() {
        super.viewDidLoad()
        links = [NavData]()
        api.loadShots("http://158.85.122.170:81/mongo_api/nav_menu.php", completion: didLoadShots)
        
    }
    
    func didLoadShots(Links : [NavData]) {
        self.links = Links
        NavTableView.reloadData()
        //   println(links)
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //  println(links.count)
        return links.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCellWithIdentifier("navCell", forIndexPath: indexPath) 
        let linksCell = links[indexPath.row] as NavData
        if let linkLabel = cell.viewWithTag(1) as? UILabel {
            linkLabel.text = linksCell.category
            
        }
        
        // cell.menuLabel.text = menuItem[indexPath.row]
        
        return cell
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if(segue.identifier == "subNav") {
            let vc = segue.destinationViewController as! subNavViewController
            let myIndexPath : NSIndexPath = self.NavTableView.indexPathForSelectedRow!
            let row = myIndexPath.row
            vc.xollywood = links[row].genre!
            vc.category = links[row].category!
            
        }
    }
    
    
}
