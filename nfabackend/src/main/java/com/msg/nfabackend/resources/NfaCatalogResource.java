package com.msg.nfabackend.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.msg.nfabackend.entities.nfaCatalog;
import com.msg.nfabackend.services.QueryService;

@Path("/nfa_catalog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaCatalogResource {
	
	QueryService queryService = new QueryService();
	
	@GET
	public List<nfaCatalog> getAllNfa() {
		return queryService.getAllNfa();
	}

}
