import Cookies from 'js-cookie';
const saveToken = (token) => { // lưu 1 tiếng
    const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000); 
    Cookies.set('authToken', token, {
      expires: expiryDate,
      path: '*',
      secure: true, 
      sameSite: 'Strict', 
    });
};
const getToken = () => {
    const token = Cookies.get('authToken');
    return token;
};
const removeToken = () => {
    Cookies.remove('authToken');
};
const authTokenControl = {
    saveToken,
    getToken,
    removeToken,
};
export default authTokenControl;