//
//  ProgressView.swift
//  CustomProgressBar
//
//  Created by Sztanyi Szabolcs on 16/10/14.
//  Copyright (c) 2014 Sztanyi Szabolcs. All rights reserved.
//

import UIKit

 var percentagetoset:Int!

@IBDesignable class ProgressView: UIView {

    private let progressLayer: CAShapeLayer = CAShapeLayer()
    @IBInspectable var counterColor:UIColor = UIColor.lightGrayColor()
    
@IBInspectable var counterfillColor:UIColor = UIColor.lightGrayColor()
    
    
    private var progressLabel: UILabel
    
    required init(coder aDecoder: NSCoder) {
        progressLabel = UILabel()
        super.init(coder: aDecoder)!
        //createProgressLayer(counterfillColor)
       // createLabel()
    }
    
    override init(frame: CGRect) {
        progressLabel = UILabel()
        super.init(frame: frame)
        createProgressLayer(counterfillColor)
       // createLabel()
    }
    
     override func drawRect(rect: CGRect)
     {
        let center = CGPoint(x: bounds.width/2, y: bounds.height/2)
        let radius1:CGFloat = max(bounds.width, bounds.height)
        let arcWidth:CGFloat = 2
        
        let startAngel:CGFloat = 0
        let endAngel:CGFloat = pi*2
        drawArc(center, radius1: radius1, arcWidth: arcWidth, startAngel: startAngel, endAngel: endAngel)

        createProgressLayer(counterfillColor)
    }
    
    
     func createProgressLayer(color:UIColor) {
        let startAngle:CGFloat = 3*pi/2
        let endAngle = CGFloat(startAngle + 2 * pi)
        let centerPoint = CGPointMake(CGRectGetWidth(frame)/2 , CGRectGetHeight(frame)/2)
        
        let gradientMaskLayer = gradientMask(color)
        progressLayer.path = UIBezierPath(arcCenter:centerPoint, radius: CGRectGetWidth(frame)/2 - 1.1, startAngle:startAngle, endAngle:endAngle, clockwise: true).CGPath
        progressLayer.backgroundColor = UIColor.clearColor().CGColor
        progressLayer.fillColor = nil
        progressLayer.strokeColor = UIColor.blackColor().CGColor
        progressLayer.lineWidth = 2
        progressLayer.strokeStart = 0.0
        progressLayer.strokeEnd = 0.0
      //  progressLayer.backgroundColor = UIColor.greenColor().CGColor
        
        gradientMaskLayer.mask = progressLayer
        layer.addSublayer(gradientMaskLayer)
    }
    
    private func gradientMask(color:UIColor) -> CAGradientLayer {
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = bounds

        gradientLayer.locations = [0.0, 1.0]
        

        let colorTop: AnyObject = color.CGColor
        let colorBottom: AnyObject = color.CGColor
        let arrayOfColors: [AnyObject] = [colorTop, colorBottom]
        gradientLayer.colors = arrayOfColors
        
        return gradientLayer
    }
    

    
//      func hideProgressView() {
//        progressLayer.strokeEnd = 0.0
//        progressLayer.removeAllAnimations()
//        progressLabel.text = "Load content"
//    }
    
    func animateProgressView(viewname:String,percentagetodisplay:Float)
    {
        if viewname == "SupplemtprogressView"
        {
        progressLayer.strokeEnd = 0.0
           // progressLayer.fillColor = UIColor.greenColor().CGColor
        let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)

        animation.fromValue = CGFloat(0.0)
        animation.toValue = CGFloat(percentagetodisplaynew)
        animation.duration = 2.5
        animation.delegate = self
        animation.removedOnCompletion = false
        animation.additive = true
        animation.fillMode = kCAFillModeForwards
        progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
        else if viewname == "LifestyleProgressView"
        {
            progressLayer.strokeEnd = 0.0
            let animation = CABasicAnimation(keyPath: "strokeEnd")
     
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)
            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
          

        }
        else if viewname == "WorkoutProgressView"
        {
            progressLayer.strokeEnd = 0.0
            let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)

            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
        else if viewname == "Fooddrinkprogressview"
        {
            let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)
            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
        else if viewname == "thisweekProgressview"
        {
            let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)
            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
        else if viewname == "progressviewnew"
        {
            let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)
            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
        else
        {
            let animation = CABasicAnimation(keyPath: "strokeEnd")
            let percentagetodisplaynew = percentagetodisplay/100
            print(percentagetodisplaynew)
            animation.fromValue = CGFloat(0.0)
            animation.toValue = CGFloat(percentagetodisplaynew)
            animation.duration = 2.5
            animation.delegate = self
            animation.removedOnCompletion = false
            animation.additive = true
            animation.fillMode = kCAFillModeForwards
            progressLayer.addAnimation(animation, forKey: "strokeEnd")
        }
    }
    
    override func animationDidStop(anim: CAAnimation, finished flag: Bool) {
        //progressLabel.text = "Done"
    }
    
    private func drawArc(center:CGPoint,radius1:CGFloat,arcWidth:CGFloat,startAngel:CGFloat,endAngel:CGFloat)
    {
        let path = UIBezierPath(arcCenter: center, radius: radius1/2 - arcWidth/2, startAngle: startAngel, endAngle: endAngel, clockwise: true)
        path.lineWidth = arcWidth
        counterColor.setStroke()
        path.stroke()
    }
    
}





















