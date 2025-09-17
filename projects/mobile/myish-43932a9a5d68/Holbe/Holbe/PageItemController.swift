//
//  PageItemController.swift
//  Holbe
//
//  Created by Nikhil Srivastava on 4/11/16.
//  Copyright © 2016 Nikhil Srivastava. All rights reserved.
//

import Foundation
import UIKit


class PageItemController: UIViewController {
    
    var itemIndex: Int = 0
    var imageName: String = "" {
        
        didSet {
            
            if let imageView = imageView where imageName != "Dummy"{
                imageView.image = UIImage(named: imageName)
            }
            
        }
  }

    @IBOutlet weak var btnSkip: UIButton!
    @IBOutlet weak var imageView: UIImageView!
    
    @IBAction func skip(sender: UIButton) {
       self.performSegueWithIdentifier("skip", sender: self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imageView?.hidden = false
        //btnGetStarted.hidden = true
        imageView!.image = UIImage(named: imageName)
        btnSkip.layer.addBorder(.Bottom, color: UIColor.whiteColor(), thickness: 1)
    }

    
    
    
}
