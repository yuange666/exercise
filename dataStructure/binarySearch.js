function binarySearch(arr,v) {
    let l=0,r=arr.length-1,mid;
    while (l<=r){
        mid=Math.floor((l+r)/2);
        if(arr[mid]>v){
            r=mid-1;
        }else if(arr[mid]<v){
            l=mid+1;
        }else {
            return mid;
        }
    }
    return -1;
}
export {
    binarySearch
}