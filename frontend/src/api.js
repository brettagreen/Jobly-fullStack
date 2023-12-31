import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // USER ROUTES

  //Get user info
  static async getUser(username) {
    return await this.request(`users/${username}`); 
  }

  //Update user profile
  static async updateProfile(username, profile) {
    return await this.request(`users/${username}`, profile, 'patch');
  }

  //Apply to job
  static async applyToJob(username, jobId) {
    return await this.request(`users/${username}/jobs/${jobId}`, null, "post");
  }

  //Unapply to job
  static async unapplyFromJob(username, jobId) {
    return await this.request(`users/${username}/jobs/unapply/${jobId}`, null, "post");
  }

  // AUTH ROUTES

  static async registerUser(userInfo) {
    return await this.request(`auth/register`, userInfo, "post");
  }

  static async loginUser(loginInfo) {
    return await this.request(`auth/token`, loginInfo, "post");
  }

  // COMPANY ROUTES

  // Get all companies
  static async getCompanies() {
    return await this.request('companies');

  }

  // Get details of a company
  static async getCompany(handle) {
    handle = handle.toLowerCase();
    return await this.request(`companies/${handle}`);
  }

  // JOB ROUTES

  // Get all jobs
  static async getJobs() {
    return await this.request('jobs');

  }

  //Get details of a job
  static async getJob(id) {
    return await this.request(`jobs/${id}`);

  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;