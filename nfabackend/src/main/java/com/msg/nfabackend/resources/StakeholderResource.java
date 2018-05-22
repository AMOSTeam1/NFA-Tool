package com.msg.nfabackend.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.services.QueryService;

@Path("/stakeholder")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class StakeholderResource {
	QueryService queryService = new QueryService();
	
	@GET
	public List<Stakeholder> getAllStakeholder() {
		return queryService.getAllStakeholder();
	}
}