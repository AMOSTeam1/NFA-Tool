package com.msg.nfabackend;

import java.io.IOException;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import javax.ws.rs.core.Response;

/*https://en.wikipedia.org/wiki/Cross-origin_resource_sharing*/

@Provider
public class CORSFilter implements ContainerResponseFilter {
    
  @Override
  public void filter(final ContainerRequestContext requestContext,
                     final ContainerResponseContext cres) throws IOException {
	  cres.getHeaders().add("Access-Control-Allow-Origin", "*");
      cres.getHeaders().add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
      cres.getHeaders().add("Access-Control-Allow-Credentials", "true");
      cres.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD"); 
      cres.getHeaders().add("Access-Control-Max-Age", "1209600");
      
      
      if (HttpMethod.OPTIONS.equals(requestContext.getMethod())) {
          cres.setStatus(Response.Status.ACCEPTED.getStatusCode());
      }
      
//      System.out.println(requestContext.getHeaders());
//      System.out.println(cres.getHeaders());
//      
//      System.out.println(requestContext.getUriInfo().getAbsolutePath());
//      System.out.println(cres.getStatusInfo());
//      System.out.println(cres.getEntity());
//      System.out.println(cres.getEntity().toString());
//      System.out.println(cres.getMediaType());
//      System.out.println(cres.getStatus());
  }
  
}