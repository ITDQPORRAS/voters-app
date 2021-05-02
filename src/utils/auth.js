const TokenKey = 'kzgn_voters';
const info = "infoxkzgn_voters"
const barangay = "barangaykzgn_voters"
const member = "memberkzgn_voters"
const selected = "selectedkzgn_voters"
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export function getToken() {
    return ls.get(TokenKey);
}
export function setToken(token) {
    return ls.set(TokenKey, token);
}
export function removeToken() {
    return ls.remove(TokenKey);
}
export function setInfo(data) {
    return ls.set(info, data);
}
export function getInfo() {
    return ls.get(info);
}
export function setMember(data) {
    return ls.set(member, data);
}
export function getMember() {
    return ls.get(member);
}
export function getBrgy() {
    return ls.get(barangay);
}
export function setBrgy(brgy) {
    return ls.set(barangay, brgy);
}
export function setSelected(data) {
    return ls.set(selected, data);
}
export function getSelected() {
    return ls.get(selected);
}