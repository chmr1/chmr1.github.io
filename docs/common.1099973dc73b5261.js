"use strict";(self.webpackChunkmyApp=self.webpackChunkmyApp||[]).push([[592],{5228:(c,_,s)=>{s.d(_,{c:()=>h});var n=s(2394),p=s(9393),r=s(8256),o=s(529);let h=(()=>{class e{constructor(t){this.http=t,this.API_URL=`${n.v.apiUrl}/event-type`}query(t){const a=(0,p.b)(t);return this.http.get(`${this.API_URL}/`,{params:a,observe:"response"})}find(t){return this.http.get(`${this.API_URL}/${t}`,{observe:"response"})}create(t){return this.http.post(`${this.API_URL}/`,t,{observe:"response"})}update(t){return this.http.put(`${this.API_URL}/${t.id}`,t,{observe:"response"})}delete(t){return this.http.delete(`${this.API_URL}/${t}`,{observe:"response"})}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(o.eN))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);