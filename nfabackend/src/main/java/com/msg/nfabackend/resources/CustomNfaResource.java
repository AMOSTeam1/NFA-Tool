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

import com.msg.nfabackend.entities.CustomNFA;
import com.msg.nfabackend.services.QueryService;

@Path("/nfa_edit")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomNfaResource {

QueryService queryService = new QueryService();
	
//	@GET
//	public List<CustomNFA> getAllNfa() {
//		return queryService.getAllNfa();
//	}

	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCustomNfa (CustomNFA customNfa, @Context UriInfo uriInfo) {
		System.out.println("asdasdasdasdasd");
		System.out.println("asssssssssssssssssssssssssssssss");
		CustomNFA customNfaTemp = queryService.createCustomNfa(customNfa);
		String newId = String.valueOf(customNfaTemp.getId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(customNfaTemp)
                .build();
	}
	
}
