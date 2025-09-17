//
//  BorderLine.swift
//  Myish
//
//  Created by Nikhil Srivastava on 10/30/15.
//  Copyright © 2015 Appsriv Technologies. All rights reserved.
//
import UIKit
import Foundation
import QuartzCore

extension UIView{
    
    func createTopBorderWithHeight(height: CGFloat, color: UIColor) -> CALayer {
        return getOneSidedBorderWithFrame(CGRectMake(0, 0, self.frame.size.width, height), color:color)
    }
    
    func addTopBorderWithHeight(height: CGFloat, color:UIColor) {
        addOneSidedBorderWithFrame(CGRectMake(self.frame.origin.x, self.frame.origin.y, self.frame.size.width, height), color:color)
    }
    
    func createBottomBorderWithHeight(height: CGFloat, color:UIColor) -> CALayer {
        return getOneSidedBorderWithFrame(CGRectMake(0, self.frame.size.height-height, self.frame.size.width, height), color:color)
    }
    
    func addBottomBorderWithHeight(height: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(7, self.frame.size.height-height, self.frame.size.width-14, height), color:color)
    }
    
    func addBottomBar(height: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(0, self.frame.size.height, self.frame.size.width, height), color:color)
    }
    
    func addRightBar(width: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(self.frame.origin.x + self.frame.size.width, self.frame.origin.y - 15, width, 50), color:color)
    }
    
    func addBottomRightBar(width: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake((self.frame.size.width - 10)/3 + 1, self.frame.size.height + 2, width, 66), color:color)
    }
    
    func addBottomRightBar2(width: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(2*(self.frame.size.width - 6)/3 + 1, self.frame.size.height + 2, width, 66), color:color)
    }
    
    func addTopBar(height: CGFloat, color:UIColor){
        return addOneSidedBorderWithFrame(CGRectMake(0, self.frame.size.height + 68, self.frame.size.width, height), color:color)
    }
    
    func addRectBar(rect: CGRect, color:UIColor){
         return addOneSidedBorderWithFrame(rect, color: color)
    }
    
    func addPostTitleBottomBar(height: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(-70, self.frame.size.height, self.frame.size.width + 90, height), color:color)
    }
    
    //////////////////////////////////////////////////////////////////////////////
    
    
    func addUserBottomBar(height: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(0, self.frame.size.height + 5, self.superview!.frame.size.width, height), color:color)
    }
   
    func addUserBottomRightBar(width: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake((self.superview!.frame.size.width - 10)/3 + 1, self.frame.size.height + 7, width, 76), color:color)
    }
    
    func addUserBottomRightBar2(width: CGFloat, color:UIColor) {
        return addOneSidedBorderWithFrame(CGRectMake(2*(self.superview!.frame.size.width - 6)/3 + 1, self.frame.size.height + 7, width, 76), color:color)
    }
    
    func addUserTopBar(height: CGFloat, color:UIColor){
        return addOneSidedBorderWithFrame(CGRectMake(0, self.frame.size.height + 83, self.superview!.frame.size.width, height), color:color)
    }
    
    func addUserRectBar(rect: CGRect, color:UIColor){
        return addOneSidedBorderWithFrame(rect, color: color)
    }

    ///////////////////////////////////////////////////////////////////////////////////
    
    func addBottomBorderToHeader(height: CGFloat, color:UIColor) {
        //var wid = self.superview?.frame.size.width
        //println("@bottomborder: \(self.frame.size.width)")
        return addOneSidedBorderWithFrame(CGRectMake(7, 0, self.frame.size.width-14 , height), color:color)
    }
    
    
    private func addOneSidedBorderWithFrame(frame: CGRect, color:UIColor) {
        let border = CALayer()
        border.frame = frame
        //println("@layerborder: \(self.frame.size.width)")
        border.backgroundColor = color.CGColor
        self.layer.addSublayer(border)
    }
    
    private func getOneSidedBorderWithFrame(frame: CGRect, color:UIColor) -> CALayer {
        let border = CALayer()
        border.frame = frame
        border.backgroundColor = color.CGColor
        return border
    }
    
}