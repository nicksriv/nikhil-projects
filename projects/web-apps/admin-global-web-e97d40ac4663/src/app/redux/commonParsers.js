import { convertDate } from 'app/views/utilities/DateFormat'
import _get from 'lodash.get'
import { capitalizeFirstLetter } from 'helper/utils'
const commonParsers = {}

commonParsers.parseAddress = (address) => ({
    city: capitalizeFirstLetter(_get(address, 'city', null)),
    country: capitalizeFirstLetter(_get(address, 'country', null)),
    location: capitalizeFirstLetter(_get(address, 'location', null)),
    pinCode: _get(address, 'pinCode', null),
    state: capitalizeFirstLetter(_get(address, 'state', null)),
})

commonParsers.skillsCategoryData = (data) => {
    if (data.length) {
        return data.map((item) => {
            let skillCategoryArray = {
                id: _get(item, 'id', ''),
                name: _get(item, 'name', ''),
                experience: _get(item, 'experience', ''),
                skills: commonParsers.parseSkills(_get(item, 'skills', [])),
            }
            return skillCategoryArray
        })
    }
    return []
}
commonParsers.parseSkills = (data) => {
    if (data.length) {
        return data.map((item) => {
            let skillArray = {
                id: _get(item, 'id', null),
                experience: _get(item, 'experience', null),
                name: _get(item, 'name', null),
            }
            return skillArray
        })
    }
    return []
}

commonParsers.parsedSpocDetail = (spocDetail) => ({
    name: _get(spocDetail, 'name', null),
    email: _get(spocDetail, 'email', null),
    mobile: _get(spocDetail, 'mobile', null),
    designation: _get(spocDetail, 'designation', null),
})
commonParsers.parsedBankDetail = (bankDetail) => ({
    bankName: _get(bankDetail, 'bankName', null),
    accountHolderName: _get(bankDetail, 'accountHolderName', null),
    accountNumber: _get(bankDetail, 'accountNumber', null),
    branch: _get(bankDetail, 'branch', null),
    ifscCode: _get(bankDetail, 'ifscCode', null),
})

commonParsers.parsedGpsLocation = (gps) => ({
    lat: _get(gps, 'lat', null),
    lng: _get(gps, 'lng', null),
})

export { commonParsers }
