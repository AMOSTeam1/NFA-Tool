package com.msg.nfabackend.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.services.QueryService;

@Path("/nfa_factor")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class NfaFactorResource {
	QueryService queryService = new QueryService();
	
	@GET
	public List<NfaFactor> getAllNfaFactors() {
		return queryService.getAllFactors();
	}
}
