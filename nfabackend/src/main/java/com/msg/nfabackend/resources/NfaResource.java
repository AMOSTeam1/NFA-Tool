package com.msg.nfabackend.resources;

import java.net.URI;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.Nfa;
import com.msg.nfabackend.services.QueryService;

@Path("/nfa_catalog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaResource {
	QueryService queryService = new QueryService();
	
	
	
	
	
	@POST
	public Response postNfa (Nfa nfa, @Context UriInfo uriInfo) {
		Nfa newNfa = queryService.addNfa(nfa);
		String newId = String.valueOf(newNfa.getNfa_id());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(newNfa)
                .build();
	}
	
	
	 

}
