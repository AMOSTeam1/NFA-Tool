package com.msg.nfabackend.resources;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
import com.msg.nfabackend.entities.NfaInterface;
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
	@Path("/create/{project_id}/{original_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response preflight(@PathParam("project_id") int project_id, @PathParam("original_id") int original_id) {
		System.out.println("Pre-flight AAAAAAAC");
		
	    return Response.ok("[]", MediaType.APPLICATION_JSON)
	    		.header("Allow", HttpMethod.POST)
	    		.build();
	}

	@POST
	@Path("/create/{project_id}/{original_id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCustomNfa (CustomNFA customNfa, @PathParam("project_id") int project_id, @PathParam("original_id") int original_id, @Context UriInfo uriInfo) {
		CustomNFA customNfaTemp = queryService.createCustomNfa(customNfa, project_id, original_id);
		
		String projId_str = String.valueOf(customNfaTemp.getProject().getId());
		String origId_str = String.valueOf(customNfaTemp.getOriginalNfa().getId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(projId_str).path(origId_str).build();
        
        System.out.println("URI = " + uri);
        return Response.created(uri)
                .entity(customNfaTemp)
                .build();
	}
	
	@GET
	@Path("/{project_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<CustomNFA> getCurstomNfaForProject(@PathParam("project_id") int project_id){
		return queryService.getCustomNfa(project_id);
	}
	
}
