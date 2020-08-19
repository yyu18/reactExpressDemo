import {deleteContentByID} from './CURDFunc'

it('delete content',()=>{
    let array = [{id:1,content:'sdf'}]
    expect(deleteContentByID(1,array)).toStrictEqual([])
})