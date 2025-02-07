export const syncLocalStorageToCookies = (key: any) => {
    const value = localStorage.getItem("auth-storage");
    console.log("authstorage ", value);
    if (value) {
        const parsedValue = JSON.parse(value);
        console.log("parsedValue", parsedValue);
        const role = parsedValue?.user?.role;
        // const isAuthenticated = parsedValue?.state?.isAuthenticated;
       console.log("role",role);
       
        // Set expiration time (e.g., 7 days from now)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        // Set cookies with expiration
        document.cookie = `${key}=${role}; path=/; expires=${expirationDate.toUTCString()};`;
        document.cookie = `isAuthenticated=true; path=/; expires=${expirationDate.toUTCString()};`;
    }
};
