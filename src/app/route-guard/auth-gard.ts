import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenResponse } from "../models/token-response.model";
import { environment } from "../../environments/environment.development";


@Injectable({
    providedIn: 'root'
})

export class AuthGard implements CanActivate{

    readonly url = environment.apiUrl + "/token";  
    constructor(private router:Router, private http:HttpClient, private jwtHelper: JwtHelperService){}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const accessToken = localStorage.getItem("accessToken");

        if(accessToken && !this.jwtHelper.isTokenExpired(accessToken)){
            return true;
        }

        const isRefreshSuccess = await this.tryRefreshToken(accessToken as string);

        // navigate back to login page to generate new refreshToken
        if(!isRefreshSuccess){
            this.router.navigate(['']); 
        }

        return isRefreshSuccess;
    }

    private async tryRefreshToken(token: string): Promise<boolean>{
         // Try refreshing tokens using refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!token || !refreshToken) { 
            return false;
        }

        const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
        let isRefreshSuccess: boolean = false;

        let refreshTokenRes:TokenResponse;

        await this.http.post(this.url + "/refresh",credentials,{headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        }).toPromise().then((res) =>{
            refreshTokenRes = res as TokenResponse;
            if(refreshTokenRes.isRefreshTokenActive){
                localStorage.setItem('accessToken', refreshTokenRes.accessToken);
                localStorage.setItem('refreshToken', refreshTokenRes.refreshToken);
                isRefreshSuccess = true;
            }
        }).catch((_) =>{});

        if(!isRefreshSuccess){
            // This means the refresh token is expired or something went wrong on the refresh token endpoint.
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }

        return isRefreshSuccess;
    }
}
