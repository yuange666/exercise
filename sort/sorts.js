function swap(index1,index2,arr) {
    let aux=arr[index1];
    arr[index1]=arr[index2];
    arr[index2]=aux;
}

function bubbleSort1(arr) {
    let length=arr.length;
    for(let i=0;i<length;i++){
        for(let j=0;j<length-1;j++){
            if(arr[j]>arr[j+1]){
                swap(j,j+1,arr);
            }
        }
    }
    return arr;
}
//冒泡排序，复杂度O(n*n)
function bubbleSort(arr) {
    let length=arr.length;
    for(let i=0;i<length;i++){
        for(let j=0;j<length-1-i;j++){
            if(arr[j]>arr[j+1]){
                swap(j,j+1,arr);
            }
        }
    }
    return arr;
}
//选择排序，复杂度O(n*n)
function selectionSort(arr) {
    let length=arr.length,indexMin;
    for(let i=0;i<length-1;i++){
        indexMin=i;
        for(let j=i;j<length;j++){
            if(arr[indexMin]>arr[j]){
                indexMin=j;
            }
        }
        if(i!==indexMin){
            swap(i,indexMin,arr);
        }
    }
    return arr;
}
export  {
    bubbleSort,
    selectionSort
}