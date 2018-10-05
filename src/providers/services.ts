import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app/appSettings';

@Injectable()
export class Services {
  baseUrl = AppSettings.API;
  constructor(private http: Http) {
  }
  private pageName : any;
    setOption(value) {
        this.pageName = value;
        console.log('this.pageName : ',this.pageName);
    }
    getConfig() {
        return this.pageName;
    }
  /**
   * Login Service
   */
  login(credentials) {
    if (!credentials.username || !credentials.password) {
      Observable.throw('Please provide credentials');
    }
    else {
      console.log(credentials);
      
      let params: URLSearchParams = new URLSearchParams();
      params.set('username', credentials.username);
      params.set('password', credentials.password);
      params.set('uuid', credentials.udid==null?'':credentials.udid);
      params.set('platform', credentials.platform);
      return Observable.create(observer => {
        const url = this.baseUrl + 'login';
        this.http.get(url, {
          search: params
        })
          .map(res => res.json())
          .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
          )
      })
    }
  }
  /**
   * Forgot Service
   */
  forgotpassword(credentials) {

    if (!credentials.email ) {
      Observable.throw('Please provide credentials');
    }
    else {
      let params: URLSearchParams = new URLSearchParams();
      params.set('email', credentials.email);
      return Observable.create(observer => {
        const url = this.baseUrl + 'forgotPassword';
        this.http.get(url, {
          search: params
        })
          .map(res => res.json())
          .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
          )
      })
    }
  }

  /**
   * logout
   */
  logout(token) {
    if (!token) {
      Observable.throw('Token is missing');
    }
    else {
      token = token.replace('+', '%20');
      let params: URLSearchParams = new URLSearchParams();

      params.set('token', token);
      console.log('ye rahe params ', params);
      return Observable.create(observer => {
        const url = this.baseUrl + 'logout';
        this.http.get(url, {
          search: params
        })
          .map(res => res.json())
          .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
          )
      })
    }
  }

  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  /**
   * Registration
   */
  register(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'schoolRegister';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }

    /**
   * Registration
   */
  registerTeacher(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'teacherRegister';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }


    /**
   * Registration
   */
  getFav(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'getFavList';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }
    /**
   * Registration
   */
  saveTeachersettings(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'saveTeachersettings';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }

     /**
   * Registration
   */
  getMatchesByDay(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'getMatchesByDay';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }     
  
  
  
  
  
  /**
  * Registration
  */
 ShowNotification(user) { 

   console.log('user is ', user);
   if (user) {
     return Observable.create(observer => {
       const url = this.baseUrl + 'ShowNotification';
       this.http.post(url, user)
         .map(res => res.json())
         .subscribe(
         (response) => {
           console.log('responaw L: ',response);
           
           if (response.code != '200') {
             observer.error(response);
           }
           else {
             observer.next(response);

           }
           observer.complete();

         },
         (error) => {
           console.log('errrrror',error);
           
           observer.error(error);
         }
         )
     })
   }
 }
  
  
  /**
  * Registration
  */
 updateNotification(user) { 

   console.log('user is ', user);
   if (user) {
     return Observable.create(observer => {
       const url = this.baseUrl + 'updateNotification';
       this.http.post(url, user)
         .map(res => res.json())
         .subscribe(
         (response) => {
           console.log('responaw L: ',response);
           
           if (response.code != '200') {
             observer.error(response);
           }
           else {
             observer.next(response);

           }
           observer.complete();

         },
         (error) => {
           console.log('errrrror',error);
           
           observer.error(error);
         }
         )
     })
   }
 }
  
  
  
  /**
  * Registration
  */
 SendNotification(user) { 

   console.log('user is ', user);
   if (user) {
     return Observable.create(observer => {
       const url = this.baseUrl + 'SendNotification';
       this.http.post(url, user)
         .map(res => res.json())
         .subscribe(
         (response) => {
           console.log('responaw L: ',response);
           
           if (response.code != '200') {
             observer.error(response);
           }
           else {
             observer.next(response);

           }
           observer.complete();

         },
         (error) => {
           console.log('errrrror',error);
           
           observer.error(error);
         }
         )
     })
   }
 }
     /**
   * Registration
   */
  getMatchesByPeriod(user) { 

    console.log('user is ', user);
    if (user) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'getMatchesByPeriod';
        this.http.post(url, user)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }

/**
   * Registration
   */
  addToFav(data) { 

    console.log('user is ', data);
    if (data) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'addToFav';
        this.http.post(url, data)
          .map(res => res.json())
          .subscribe(
          (response) => {
            console.log('responaw L: ',response);
            
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            console.log('errrrror',error);
            
            observer.error(error);
          }
          )
      })
    }
  }
  /**
   * Login Service
   */
  getTeachers() {

   
      return Observable.create(observer => {
        const url = this.baseUrl + 'getTeachers';
        this.http.get(url, {
          search: ''
        })
          .map(res => res.json())
          .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
          )
      })
    
  }


   /**
   * Login Service
   */
  getStandards() {

   
    return Observable.create(observer => {
      const url = this.baseUrl + 'getStandards';
      this.http.get(url, '')
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  
}

  /**
   * Forget Password
   */
  forgetPassword(params) {

    console.log('user is ', params);
    if (params) {
      return Observable.create(observer => {
        const url = this.baseUrl + 'forgetPassword';
        this.http.post(url, params)
          .map(res => res.json())
          .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
          )
      })
    }
  }


  /**
   * Get Profile data
   */
  getProfileData(token) {
    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    console.log('params are ', params);

    return Observable.create(observer => {
      if (!params) {
        observer.error("params are empty");
        return;
      }
      const url = this.baseUrl + 'getUserProfile';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

  /**
   * Get All Countries
   */
  /**
  * Get Profile data
  */
  getAllCountries() {
    return Observable.create(observer => {
      const url = this.baseUrl + 'getAllCountries';
      this.http.get(url)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }
  /**
   * Get All States
   */
  getAllStates() {
    return Observable.create(observer => {
      const url = this.baseUrl + 'getAllStates';
      this.http.get(url)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }


  /**
   * Set Profile data
   */
  setUserProfile(params) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });

    return Observable.create(observer => {
      const url = this.baseUrl + 'setUserProfile';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }


  /**
  * Update User Password
  */
  updateUserPass(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'updateUserPass';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }


  /**
* Update User Profile photo
*/
  uploadProfilePhoto(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'updateUserPass';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }

  /**
  * DELETE USER
  */
  deleteUser(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'deleteUser';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }
  /**
  * Social Connect
  */
  socialConnect(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'socialConnect';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }


  /**
   * social user already exist
   */

  socialUserExist(params) {
    return Observable.create(observer => {
      const url = this.baseUrl + 'socialUserExist';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }


  /**
 * searchSchoolByGpa
 */
  searchSchoolByGpa(token, form) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();


    params.set('token', token);
    params.set('school-name', form.school);
    params.set('type', form.type);
    params.set('state', form.state);
    params.set('gpa', form.hGPA);


    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'searchSchoolByGpa';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

  /**
 * searchSchoolByGpaDetail
 */
  searchSchoolByGpaDetail(token, form) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    console.log('ye rahe form ', form);

    params.set('token', token);
    params.set('school-name', form.school);
    params.set('type', form.type);
    params.set('state', form.state);
    params.set('gpa', form.hGPA);
    params.set('offset', form.offset);


    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'searchSchoolByGpaDetail';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }
  /**
 * getGradeScalePointsData
 */
  getGradeScalePointsData(token) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();


    params.set('token', token);


    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'getGradeScalePointsData';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }



  /**
   * getAllCountries
   */
  getCountriesName() {

    return Observable.create(observer => {
      const url = '../assets/countries.json'
      this.http.get(url)
        .map(res => res.json())
        .subscribe(
        (response) => {

          observer.next(response);
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }


  /**
   * searchScholarship
   */
  searchScholarship(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'searchScholarship'
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {

          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

 /**
   * getSingleScholarship
   */
  getSingleScholarships(token,ID) {
    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    params.set('scholarshipID', ID);
    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'getSingleScholarships'
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {

          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

/**
 * getGradeScalePointsData
 */
  getScholarshipData(token) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'getScholarshipData';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

  /**
   * Set Profile data
   */
  scholarshipApply(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'scholarshipApply';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }

    /**
   * Set Profile data
   */
  scholarshipSave(params) {

    return Observable.create(observer => {
      const url = this.baseUrl + 'scholarshipSave';
      this.http.post(url, params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }

  /**
   * Send Contact Us Email Service
   */
  sendContactUs(params) {
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });
    
    return Observable.create(observer => {
      const url = this.baseUrl + 'contactUs';
      this.http.post(url,params)
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

/**
 * getSavedScholarships
 */
  getSavedScholarships(token,offset) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    params.set('offset', offset);
    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'getSavedScholarships';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

/**
 * getMatchedScholarships
 */
  getMatchedScholarships(token,offset) {

    token = token.replace('+', '%20');
    let params: URLSearchParams = new URLSearchParams();
    params.set('token', token);
    params.set('offset', offset);
    console.log('ye rahe params ', params);
    return Observable.create(observer => {
      const url = this.baseUrl + 'getMatchedScholarships';
      this.http.get(url, {
        search: params
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })

  }

/**
 * AddCoins
 */
AddCoins(params) {

  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  
  return Observable.create(observer => {
    const url = this.baseUrl + 'addCoins';
    this.http.post(url,params)
        .map(res => res.json())
        .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
        )
    })
  }


/**
 * RemoveCoins
 */
RemoveCoins(params) {

  
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  
  return Observable.create(observer => {
    const url = this.baseUrl + 'removeCoins';
    this.http.post(url,params)
        .map(res => res.json())
        .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
        )
    })
  }


  /**
 * RemoveCoins
 */
getDashboardInfo(params) {
  
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  let options = new RequestOptions({ headers: headers });
  
  return Observable.create(observer => {
    const url = this.baseUrl + 'getDashboardInfo';
    this.http.post(url,params)
        .map(res => res.json())
        .subscribe(
          (response) => {
            if (response.code != '200') {
              observer.error(response);
            }
            else {
              observer.next(response);

            }
            observer.complete();

          },
          (error) => {
            observer.error(error);
          }
        )
    })
  }

  getprofile(id){
    return Observable.create(observer => {
      const url = this.baseUrl + 'getUserDetail?ID='+id;
      this.http.get(url, {
        search: ''
      })
        .map(res => res.json())
        .subscribe(
        (response) => {
          if (response.code != '200') {
            observer.error(response);
          }
          else {
            observer.next(response);

          }
          observer.complete();

        },
        (error) => {
          observer.error(error);
        }
        )
    })
  }

}