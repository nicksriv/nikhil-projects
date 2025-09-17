//
//  CameraViewController.swift
//  Myish
//
//  Created by Nikhil Srivastava on 9/21/15.
//  Copyright (c) 2015 Appsriv Technologies. All rights reserved.
//

import UIKit
import AVFoundation
import Photos

class CameraViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate{

    @IBOutlet weak var previewView: UIView!
    var myImageView: UIImageView!
    var images:NSMutableArray!
    @IBOutlet weak var ImgButton: UIButton!
    
    var captureSession: AVCaptureSession?
    var stillImageOutput: AVCaptureStillImageOutput?
    var previewLayer: AVCaptureVideoPreviewLayer?
    let picker = UIImagePickerController()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        myImageView = UIImageView()
        images = NSMutableArray()
        self.fetchPhotoAtIndexFromEnd(0)
        ImgButton.imageView?.image = (images[0] as? UIImage)

        picker.delegate = self
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        self.fetchPhotoAtIndexFromEnd(0)
        ImgButton.imageView?.image = self.scaleUIImageToSize((images[0] as? UIImage)!, size: ImgButton.frame.size)

        captureSession = AVCaptureSession()
        captureSession!.sessionPreset = AVCaptureSessionPresetPhoto
        
        let backCamera = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
        
        var error: NSError?
        var input: AVCaptureDeviceInput!
        do {
            input = try AVCaptureDeviceInput(device: backCamera)
        } catch let error1 as NSError {
            error = error1
            input = nil
        }
        
        if error == nil && captureSession!.canAddInput(input) {
            captureSession!.addInput(input)
            
            stillImageOutput = AVCaptureStillImageOutput()
            stillImageOutput!.outputSettings = [AVVideoCodecKey: AVVideoCodecJPEG]
            if captureSession!.canAddOutput(stillImageOutput) {
                captureSession!.addOutput(stillImageOutput)
                
                previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
                previewLayer!.videoGravity = AVLayerVideoGravityResizeAspect
                previewLayer!.connection?.videoOrientation = AVCaptureVideoOrientation.Portrait
                previewView.layer.addSublayer(previewLayer!)
                
                captureSession!.startRunning()
            }
        }
        
    }
    
    func fetchPhotoAtIndexFromEnd(index:Int) {
        
        let imgManager = PHImageManager.defaultManager()

        let requestOptions = PHImageRequestOptions()
        requestOptions.synchronous = true

        let fetchOptions = PHFetchOptions()
        fetchOptions.sortDescriptors = [NSSortDescriptor(key:"creationDate", ascending: true)]
        do{
         let fetchResult = try PHAsset.fetchAssetsWithMediaType(PHAssetMediaType.Image, options: fetchOptions)

            if fetchResult.count > 0 {

                imgManager.requestImageForAsset(fetchResult.objectAtIndex(fetchResult.count - 1 - index) as! PHAsset, targetSize: view.frame.size, contentMode: PHImageContentMode.AspectFill, options: requestOptions, resultHandler: { (image, _) in

                    self.images.addObject(image!)

                })
            }
        }
        catch {
            
        }
    }
    
    func scaleUIImageToSize(let image: UIImage, let size: CGSize) -> UIImage {
        let hasAlpha = false
        let scale: CGFloat = 0.0 
        
        UIGraphicsBeginImageContextWithOptions(size, !hasAlpha, scale)
        image.drawInRect(CGRect(origin: CGPointZero, size: size))
        
        let scaledImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        
        return scaledImage
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        previewLayer!.frame = previewView.bounds
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingImage image: UIImage!, editingInfo: [NSObject : AnyObject]!) {
        //var chosenImage = info[UIImagePickerControllerOriginalImage] as! UIImage //2
        myImageView.contentMode = .ScaleAspectFit //3
        myImageView.image = image //4
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    func imagePickerControllerDidCancel(picker: UIImagePickerController) {
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    @IBAction func didPressTakePhoto(sender: UIButton) {
        
        if let videoConnection = stillImageOutput!.connectionWithMediaType(AVMediaTypeVideo) {
            videoConnection.videoOrientation = AVCaptureVideoOrientation.Portrait
            stillImageOutput?.captureStillImageAsynchronouslyFromConnection(videoConnection, completionHandler: {(sampleBuffer, error) in
                if (sampleBuffer != nil) {
                    let imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(sampleBuffer)
                    let dataProvider = CGDataProviderCreateWithCFData(imageData)
                    let cgImageRef = CGImageCreateWithJPEGDataProvider(dataProvider, nil, true, CGColorRenderingIntent.RenderingIntentDefault)
                    
                    let image = UIImage(CGImage: cgImageRef!, scale: 1.0, orientation: UIImageOrientation.Right)
                    self.ImgButton.imageView!.image = image
                    let imageSave = UIImageJPEGRepresentation(image, 0.6)
                    let compressedJPGImage = UIImage(data: imageSave!)
                    UIImageWriteToSavedPhotosAlbum(compressedJPGImage!, nil, nil, nil)
                }
            })
        }    }
    
    func noCamera(){
        let alertVC = UIAlertController(title: "No Camera", message: "Sorry, this device has no camera", preferredStyle: .Alert)
        let okAction = UIAlertAction(title: "OK", style:.Default, handler: nil)
        alertVC.addAction(okAction)
        presentViewController(alertVC, animated: true, completion: nil)
    }
    
    @IBAction func photoFromLibrary(sender: UIButton) {
        picker.allowsEditing = false //2
        picker.sourceType = .PhotoLibrary //3
        //picker.modalPresentationStyle = .Popover
        presentViewController(picker, animated: true, completion: nil)//4
        
    }
    
    @IBAction func didPressTakeAnother(sender: AnyObject) {
        captureSession!.startRunning()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
