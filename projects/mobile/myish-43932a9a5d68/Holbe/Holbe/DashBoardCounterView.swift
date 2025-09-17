//
//  DashBoardCounterView.swift
//  Holbe
//
//  Created by Appsriv Technologies on 15/04/16.
//  Copyright (c) 2016 Appsriv Technologies. All rights reserved.
//

import UIKit

@IBDesignable class DashBoardCounterView: UIView

{


//    @IBInspectable var counter:Int = 90
//        {
//        didSet{
//            if counter <= numberofItems
//            {
//                setNeedsDisplay()
//            }
//            
//        }
//    }
    @IBInspectable var counterColor:UIColor = UIColor.orangeColor()
    @IBInspectable var outlineColor:UIColor = UIColor.blueColor()
    @IBInspectable var imageview:UIImage!
    
    override func drawRect(rect: CGRect)
    {
        // Drawing code
        
        let center = CGPoint(x: bounds.width/2, y: bounds.height/2)
        let radius1:CGFloat = max(bounds.width, bounds.height)
        let arcWidth:CGFloat = 2
        
        let startAngel:CGFloat = 0
        let endAngel:CGFloat = pi*2
        
        drawArc(center, radius1: radius1, arcWidth: arcWidth, startAngel: startAngel, endAngel: endAngel)
      //  drawOutline(center, radius1: radius1, arcWidth: arcWidth, startAngel: startAngel, endAngel: endAngel)
        
        
        
    }
    
    private func drawArc(center:CGPoint,radius1:CGFloat,arcWidth:CGFloat,startAngel:CGFloat,endAngel:CGFloat)
    {
        let path = UIBezierPath(arcCenter: center, radius: radius1/2 - arcWidth/2, startAngle: startAngel, endAngle: endAngel, clockwise: true)
        path.lineWidth = arcWidth
        counterColor.setStroke()
        path.stroke()
    }
    
//    private func drawOutline(center:CGPoint,radius1:CGFloat,arcWidth:CGFloat,startAngel:CGFloat,endAngel:CGFloat)
//    {
//        
//        let angelDiff:CGFloat = pi * 2
//        let arclengthperItem =  angelDiff / CGFloat(numberofItems)
//        let outerlineEndAngel = arclengthperItem * CGFloat(counter)  + startAngel
//        var outerlinePath = UIBezierPath(arcCenter: center, radius: bounds.width/2 - 2.0, startAngle: startAngel, endAngle: outerlineEndAngel, clockwise: true)
//        outerlinePath.addArcWithCenter(center, radius: bounds.width/2 - arcWidth +  2.0, startAngle: outerlineEndAngel, endAngle: startAngel, clockwise: false)
//        outerlinePath.closePath()
//       // outlineColor.setStroke()
//        outerlinePath.lineWidth = 1.5
//        outerlinePath.stroke()
//        
//    }


}
