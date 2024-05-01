class DevConfig {
    // Backend urls:
    public readonly vacationsPerUserUrl =
        "http://localhost:4809/api/all-vacations/";
    public readonly vacation = "http://localhost:4809/api/vacation/";
    public readonly likeUrl = "http://localhost:4809/api/like/";
    public readonly registerUrl = "http://localhost:4809/api/register/";
    public readonly loginUrl = "http://localhost:4809/api/login/";
    //Axios options:
    public readonly axiosOptions = {
        headers: {
            // Tell axios to also send the image:
            "Content-Type": "multipart/form-data", // We're sending also files.
        },
    };
}
class ProdConfig {
    // Backend urls:
    public readonly vacationsPerUserUrl =
        "http://52.33.213.98:4809/api/all-vacations/";
    public readonly vacation = "http://52.33.213.98:4809/api/vacation/";
    public readonly likeUrl = "http://52.33.213.98:4809/api/like/";
    public readonly registerUrl = "http://52.33.213.98:4809/api/register/";
    public readonly loginUrl = "http://52.33.213.98:4809/api/login/";
    //Axios options:
    public readonly axiosOptions = {
        headers: {
            // Tell axios to also send the image:
            "Content-Type": "multipart/form-data", // We're sending also files.
        },
    };
}
const appConfig = new DevConfig();
export default appConfig;

