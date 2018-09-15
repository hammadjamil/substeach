import { Injectable} from '@angular/core';
// detectChanges
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class Services {
    baseUrl: any ='https://staging.pixxpros.com/service/';
    serviceUrl: any = 'https://staging.pixxpros.com/service/';
    mycontesturl: any = 'https://staging.pixxpros.com/service/';
    userinfourl: any = 'https://staging.pixxpros.com/service/';
    beturl:any='https://staging.pixxpros.com/service/';
    items:any;
    time:any;
    IsConnected:any;
    userid:any;
    constructor(private http: Http, private storage: Storage) {
        this.storage.get('userid').then((val) => {
            console.log('hamzaaaaa', val);
            this.userid=val;
        });
    }
    timefun(){
        this.time= Date.now();
        this.time=Math.floor(this.time/1000);
        console.log('time:::::',this.time);
    }
    getDashboardInfo(credentials) {
       this.timefun();
            let params: URLSearchParams = new URLSearchParams();
            params.set('selectedName', credentials.selectedName);
            params.set('selectedStatus', credentials.selectedStatus);
            params.set('selectedLeague', credentials.selectedLeague);
            params.set('selectedType', credentials.selectedType);
            params.set('selectedStartTime', credentials.selectedStartTime);
            params.set('selectedFee', credentials.selectedFee);
            params.set('offset', credentials.offset);
            params.set('limit', credentials.limit);
            params.set('id', credentials.id);
            params.set('time', this.time);
            return Observable.create(observer => {
                const url = this.baseUrl + 'get-list-contests';
                this.http.get(url, {
                    search: params
                })
                    .map(res => res.json())
                    .subscribe(
                        (response) => {
                            if (response.code != '200') {
                                console.log('!200', response.code);
                                observer.error(response);
                            }
                            else {
                                console.log('200', response.code);
                                this.items = response.data.allContests;
                                observer.next(response);

                            }
                            console.log('200aaaa', response.code);
                            observer.complete();

                        },
                        (error) => {
                            console.log('error', error);
                            observer.error(error);
                        }
                    )
            })
    }
    loginuser(details){
       console.log('login service') 
    }

    login(FullUrl, params){
            console.log('login params', params);
            if (params) {
                return Observable.create(observer => {
                    const url = FullUrl;
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
    forgotpswd(FullUrl,params){
        console.log('forgotpswd params', params);
        if (params) {
            return Observable.create(observer => {
                const url = FullUrl;
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
    register(FullUrl, params){
        console.log('register params', params);
        if (params) {
            return Observable.create(observer => {
                const url = FullUrl;
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
    mycontestcount(uid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', uid);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.mycontesturl + 'get-contests-count';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    mycontestupcomming(credentials){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('selectedStatus', credentials.selectedName);
        params.set('selectedLeague', credentials.selectedLeague);
        params.set('selectedType', credentials.selectedType);
        params.set('selectedStartTime', credentials.selectedStartTime);
        params.set('selectedFee', credentials.selectedFee);
        params.set('getCount', credentials.getCount);
        params.set('userId', credentials.userId);
        params.set('offset', credentials.offset);
        params.set('limit', credentials.limit);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.mycontesturl + 'get-upcoming-contests';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    mycontestfinished(credentials) {
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        // user = { selectedName: '', selectedStatus: '', selectedLeague: '', selectedType: '', selectedStartTime: '', selectedFee: '', offset: 0, limit: 15 };
        params.set('selectedStatus', credentials.selectedStatus);
        params.set('selectedLeague', credentials.selectedLeague);
        params.set('selectedType', credentials.selectedType);
        params.set('selectedStartTime', credentials.selectedStartTime);
        params.set('selectedFee', credentials.selectedFee);
        params.set('getCount', credentials.getCount);
        params.set('userId', credentials.userId);
        params.set('offset', credentials.offset);
        params.set('limit', credentials.limit);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.mycontesturl + 'get-finished-contests';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    mycontestrunning(credentials) {
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        // user = { selectedName: '', selectedStatus: '', selectedLeague: '', selectedType: '', selectedStartTime: '', selectedFee: '', offset: 0, limit: 15 };
        params.set('selectedStatus', credentials.selectedStatus);
        params.set('selectedLeague', credentials.selectedLeague);
        params.set('selectedType', credentials.selectedType);
        params.set('selectedStartTime', credentials.selectedStartTime);
        params.set('selectedFee', credentials.selectedFee);
        params.set('getCount', credentials.getCount);
        params.set('userId', credentials.userId);
        params.set('offset', credentials.offset);
        params.set('limit', credentials.limit);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.mycontesturl + 'get-running-contests';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    filterItems(searchTerm) {
        return this.items.filter((item) => {
            return item.ContestTitle;
        });
    }
    setIsConnected(value) {
        this.IsConnected = value;
    }

    getIsConnected() {
        return this.IsConnected;
    }
    contestdetail(title,userid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        // user = { selectedName: '', selectedStatus: '', selectedLeague: '', selectedType: '', selectedStartTime: '', selectedFee: '', offset: 0, limit: 15 };
        params.set('contest', title);
        params.set('userId', userid);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.mycontesturl + 'contest-service';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    getuserdata(id){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return Observable.create(observer => {
            const url = this.userinfourl + 'get-user-data';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    standingscontestdetail(title,userid){
        this.timefun();
        let standingurl='https://staging.pixxpros.com/service/';
        let params: URLSearchParams = new URLSearchParams();
        // user = { selectedName: '', selectedStatus: '', selectedLeague: '', selectedType: '', selectedStartTime: '', selectedFee: '', offset: 0, limit: 15 };
        params.set('contest', title);
        params.set('id', userid);
        params.set('time', this.time);
        
        return Observable.create(observer => {
            const url = standingurl + 'standings';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    betcontestdetail(title,userid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        // user = { selectedName: '', selectedStatus: '', selectedLeague: '', selectedType: '', selectedStartTime: '', selectedFee: '', offset: 0, limit: 15 };
        params.set('selectedContest', title);
        params.set('selectedMember', userid);
        params.set('time', this.time);
        
        return Observable.create(observer => {
            const url = this.beturl + 'get-member-picks';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    profiledetail(user){
        let params: URLSearchParams = new URLSearchParams();
        params.set('user', user);
        return Observable.create(observer => {
            const url = this.beturl + 'get-member-picks';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            // this.items = response.data;
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    myprofiledata(user){
        let params: URLSearchParams = new URLSearchParams();
        params.set('user', user);
        return Observable.create(observer => {
            const url = this.userinfourl + 'member-profile';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    transactiondata(uid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', uid);
        params.set('time', this.time);
        
        return Observable.create(observer => {
            const url = this.serviceUrl + 'get-transactions';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    ptransactiondata(uid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', uid);
        params.set('time', this.time);
        
        return Observable.create(observer => {
            const url = this.serviceUrl + 'get-pix-transactions';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    editprofiledata(uid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', uid);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.userinfourl + 'get-profile-data';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    joincontest(uid,cid){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', uid);
        params.set('contestId', cid);
        params.set('time', this.time);
        
        return Observable.create(observer => {
            const url = this.userinfourl + 'join-contest';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    transc_taxform(id){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return Observable.create(observer => {
            const url = this.userinfourl + 'tax-form';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    withdrawreq(id,amount,email,gateway){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('Amount', amount);
        params.set('PayPalEmail', email);
        params.set('Gateway', gateway);
        return Observable.create(observer => {
            const url = this.userinfourl + 'withdraw-request';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_email(id,newemail){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('new_email', newemail);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-email-id';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_pswd(id,oldpswd,newpswd){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('old_pass', oldpswd);
        params.set('new_pass', newpswd);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-password';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_fname(id,newfname){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('fname', newfname);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-fname';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_lname(id,newlname){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('lname', newlname);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-lname';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_tzone(id,newtzone){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('tzone', newtzone);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-timezone';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    change_dob(id,newdob){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('dob', newdob);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-dob';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    uploadprofileimg(id){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        return Observable.create(observer => {
            const url = this.userinfourl + 'upload-image';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    changebillinginfo(fullurl,id,billinginfo){
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        params.set('AuthorizationCode', billinginfo.AuthorizationCode);
        params.set('CCNumber', billinginfo.CCNumber);
        params.set('CardholderName', billinginfo.CardholderName);
        params.set('ExpiryDate', billinginfo.ExpiryDate);
        params.set('Address', billinginfo.Address);
        params.set('City', billinginfo.City);
        params.set('State', billinginfo.State);
        params.set('Zip', billinginfo.Zip);
        return Observable.create(observer => {
            const url = this.userinfourl + 'update-billing-information';
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    changebillinginfopost(FullUrl,params){
        console.log('login params', params);
            if (params) {
                return Observable.create(observer => {
                    const url = FullUrl;
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
    postbets(uid,selectedContest,selectedGameType){
        this.timefun();
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', uid);
        params.set('selectedGameType', selectedGameType);
        params.set('selectedContest', selectedContest);
        params.set('time', this.time);
        return Observable.create(observer => {
            const url = this.serviceUrl + 'get-matches-list'
            ;
            this.http.get(url, {
                search: params
            })
                .map(res => res.json())
                .subscribe(
                    (response) => {
                        if (response.code != '200') {
                            console.log('!200', response.code);
                            observer.error(response);
                        }
                        else {
                            console.log('200', response.code);
                            this.items = response;
                            observer.next(response);

                        }
                        console.log('200aaaa', response.code);
                        observer.complete();

                    },
                    (error) => {
                        console.log('error', error);
                        observer.error(error);
                    }
                )
        })
    }
    addpostbets(FullUrl,params){
        console.log('register params', params);
        if (params) {
            return Observable.create(observer => {
                const url = FullUrl;
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
}
