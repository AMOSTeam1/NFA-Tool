

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.io.IOException;
import java.io.PrintWriter;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/add_entries")
public class formServlet extends HttpServlet {
	piblic static void main (String[] args) {
		public void addPost(HttpServletRequest request,
		           HttpServletResponse response) throws ServletException, IOException {
		      Connection c = null;
		      Statement stmt = null;
		      try {
		         Class.forName("org.postgresql.Driver");
		         c = DriverManager
		            .getConnection("jdbc:postgresql://localhost:5432/new_nfa","postgres", "amos18");
		         c.setAutoCommit(false);
		        System.out.println("Opened database successfully");
		         
		         
		         String factor = request.getParameter("factor");
		         String criteria = request.getParameter("criteria");
		         String metric = request.getParameter("metric");
		         String nfa_type = request.getParameter("nfa_type");
		         System.out.println("factor: " + factor);
		         System.out.println("criteria: " + criteria);
		         System.out.println("metric: " + metric);
		         System.out.println("nfa_type: " + nfa_type);
		         
		         stmt = c.createStatement();
		         
		         String sql = "INSERT INTO nfa (factor,criteria,metric, nfa_type) "
		            + "VALUES (factor, criteria, metric, nfa_type);";
		         stmt.executeUpdate(sql);
		         
		          
		         // get response writer
		         PrintWriter writer = response.getWriter();
		          
		         // build HTML code
		         String htmlRespone = "<html>";
		         htmlRespone += "<h2>Your factor is: " + factor + "<br/>";      
		         htmlRespone += "Your criteria is: " + criteria + "</h2>";    
		         htmlRespone += "</html>";
		          
		         // return response
		         writer.println(htmlRespone);
		       
		/* stmt = c.createStatement();
		        
		         String sql = "INSERT INTO nfa (nfa_id, factor,criteria,metric, nfa_type) "
		            + "VALUES (2, 'Back-end', 'Not urgent', 'sm', 'easy' );";
		         stmt.executeUpdate(sql); */
		      /*
		         ResultSet rs = stmt.executeQuery( "SELECT * FROM nfa;" );
		         while ( rs.next() ) {
		            int id = rs.getInt("nfa_id");
		            String  factor = rs.getString("factor");
		            String  criteria = rs.getString("criteria");
		            String metric = rs.getString("metric");
		            String nfa_type = rs.getString("nfa_type");
		            System.out.println( "ID = " + id );
		            System.out.println( "Factor = " + factor );
		            System.out.println( "Criteria = " + criteria );
		            System.out.println( "Metric = " + metric );
		            System.out.println( "NFA type = " + nfa_type );
		            System.out.println();
		         }
		         rs.close();
		         
		         c*/
		      stmt.close();
		    //  .commit();
		         c.close();
		         
		         }catch (Exception e) {
		         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
		         System.exit(0);
		      }
		      System.out.println("Success!");
		     
	}
   
	
}
}
