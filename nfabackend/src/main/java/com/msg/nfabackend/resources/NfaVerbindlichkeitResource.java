package com.msg.nfabackend.resources;

import java.net.URI;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.NfaValue;
import com.msg.nfabackend.services.QueryService;

@Path("nfavalue")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaVerbindlichkeitResource {

	@Inject
	private QueryService queryService;
	
	@POST
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createNfaValue(NfaValue nfaValue, @Context UriInfo uriInfo) {		
		NfaValue createNfaValue = queryService.createNfaValue(nfaValue);
		String newId = String.valueOf(createNfaValue.getId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(createNfaValue)
                .build();
	}
	
}
