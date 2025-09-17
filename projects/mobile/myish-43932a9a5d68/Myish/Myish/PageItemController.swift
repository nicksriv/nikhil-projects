//
//  PageItemController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 3/23/16.
//  Copyright © 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

class PageItemController: UIViewController {
 
    var itemIndex: Int = 0
    var imageName: String = "" {
        
        didSet {
            
            if let imageView = contentImageView where imageName != "Dummy"{
                imageView.image = UIImage(named: imageName)
            }
            
        }
    }
    
    @IBOutlet var contentImageView: UIImageView?
    
    @IBOutlet weak var btnGetStarted: UIButton!
    
    @IBAction func GetStarted(sender: UIButton) {
        let vc : AnyObject! = self.storyboard!.instantiateViewControllerWithIdentifier("TabBarController")
        self.navigationController?.pushViewController(vc as! UIViewController, animated: true)
    }
    
    
    // MARK: - View Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        if imageName == "Dummy"{
            self.btnGetStarted.hidden = false
            contentImageView?.hidden = true
        }
        else{
        contentImageView?.hidden = false
        btnGetStarted.hidden = true
        contentImageView!.image = UIImage(named: imageName)
            
        }
        
    }
    
   

}
