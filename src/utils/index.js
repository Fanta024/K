export function checkCk(cookie) {
    if (cookie.indexOf("pt_key=") !== -1) {
        const pt_Key =
            cookie.match(/pt_key=(.*?);/) &&
            cookie.match(/pt_key=(.*?);/)[1];
        const pt_Pin =
            cookie.match(/pt_pin=(.*?);/) &&
            cookie.match(/pt_pin=(.*?);/)[1];
        let ck = "pt_key=" + pt_Key + ";pt_pin=" + pt_Pin + ";";
        return ck;
    }
    else {
        alert("请粘贴正确cookie");
        return null;
    }
}