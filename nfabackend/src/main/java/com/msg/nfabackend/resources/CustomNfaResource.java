package com.msg.nfabackend.resources;

import java.net.URI;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.CustomNFA;
import com.msg.nfabackend.services.QueryService;

/**
 * JAX-RS-Resource for Entity 'CustomNfa'
 * 
 */
@Path("nfa_edit")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomNfaResource {
	
	@Inject
	private QueryService queryService;


	@OPTIONS
	@Path("/create/{OriginalId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response preflight(@PathParam("OriginalId") Long originalId) {
		System.out.println("Pre-flight AAAAAAAC");
		
	    return Response.ok("[]", MediaType.APPLICATION_JSON)
	    		.header("Allow", HttpMethod.POST)
	    		.build();
	}

	@POST
	@Path("/create/{OriginalId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCustomNfa (CustomNFA customNfa, @Context UriInfo uriInfo, @PathParam("OriginalId") Long originalId) {
		System.out.println("createCustomNfa AAAAAAB " + originalId);
		
		CustomNFA customNfaTemp = queryService.createCustomNfa(customNfa, originalId);
		
		String newId = String.valueOf(customNfaTemp.getId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(customNfaTemp)
                .build();
        
//        return Response.created(uri)
//                .entity(customNfaTemp)
//                .build();
	}
	
	
}
