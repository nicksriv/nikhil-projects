//
//  InitiateViewController.swift
//  localy
//
//  Created by Nikhil Srivastava on 6/29/16.
//  Copyright © 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class InitiateViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
       performSegueWithIdentifier("login", sender: self)
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    
    */
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "login" {
        _ = segue.destinationViewController as! LoginViewController
        }
    }

}
