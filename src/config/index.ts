interface ISettings {
    authorization_default: string;
    password_default: string;
    internetProtocol: string;
}

const Settings: ISettings = {
    authorization_default:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhhbl9xdXllbiI6ImFkbWluIiwiaWF0IjoxNjI0MjQ4ODgyLCJleHAiOjE2MjQzMzUyODJ9.c1gaced4AtHW1QLCdFGzDMJE7-IursJIV6ZUHjgnEws",
    password_default: "Aa@123",
    internetProtocol: "http://",
};

export default Settings;
