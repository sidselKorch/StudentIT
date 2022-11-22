function useInitialsHook(currentUser){
    let initials = "";
    const FIRST_NAME = currentUser.get("firstName")[0]
    const LAST_NAME = currentUser.get("lastName")[0]
    if(typeof FIRST_NAME !== 'undefined' && typeof LAST_NAME !== 'undefined'){
        initials = FIRST_NAME + LAST_NAME;
    } else {
        initials = "NaN"
    }

    return {initials}
    
}

export default useInitialsHook;