package com.msg.nfabackend.resources;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.services.QueryService;

@Path("nfa_criteria")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaCriteriaResource {
	
	@Inject
	private QueryService queryService;
	
	@GET
	public List<NfaCriteria> getAllNfaCriterias() {
		return queryService.getAllNfaCriterias();
	}
}
