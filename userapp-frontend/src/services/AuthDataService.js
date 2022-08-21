import http from "../http-common";

class AuthDataService {
  login(data) {
    return http.post("/auth", data);
  }
  getCurrentUser() {
    return http.get("/auth/username");
  }
}
export default new AuthDataService();