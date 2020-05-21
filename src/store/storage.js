
// get data from storage 
export const getStorageData = () => {
    if(localStorage.getItem("state")){
        return JSON.parse(localStorage.getItem("state"));
    }
    return null
}

// push element to localStorage
export const updateStorageData = (data) => {
    localStorage.setItem("state",JSON.stringify(data));
}
