package com.msg.nfabackend.resources;

import java.net.URI;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.msg.nfabackend.entities.nfaCatalog;
import com.msg.nfabackend.services.QueryService;

@Path("nfa_catalog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaCatalogResource {
	
	@Inject
	private QueryService queryService;
	
	@GET
	public List<nfaCatalog> getAllNfa() {
		return queryService.getAllNfa();
	}

	@POST
	@Path("/create/{metricId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createNfa (@PathParam("metricId") Long metricId, nfaCatalog nfa, @Context UriInfo uriInfo) {
		nfaCatalog nfaCatalog = queryService.createNfa(metricId, nfa);
		String newId = String.valueOf(nfaCatalog.getNfaCatalogId());
        URI uri = uriInfo.getAbsolutePathBuilder().path(newId).build();
        return Response.created(uri)
                .entity(nfaCatalog)
                .build();
	}
	
}
