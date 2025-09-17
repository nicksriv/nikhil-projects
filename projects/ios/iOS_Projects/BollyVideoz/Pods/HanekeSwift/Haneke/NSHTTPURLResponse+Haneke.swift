import Foundation

extension NSHTTPURLResponse {
    
    func hnk_validateLengthOfData(data: NSData) -> Bool {
        let expectedContentLength = self.expectedContentLength
        if (expectedContentLength > -1) {
            let dataLength = data.length
            return Int64(dataLength) >= expectedContentLength
        }
        return true
    }
    
}