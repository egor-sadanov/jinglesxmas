/*
	This file represents DeliveryCentre object as a template for conversion into json file
*/

public class DeliveryCentre {
	private String deliveryZone;
	private boolean surcharge;

	// private String deliveryCentre;
	// private String latitude;
	// private String longtitude;

	public DeliveryCentre(String deliveryZone, boolean surcharge) {
		this.deliveryZone = deliveryZone;
		this.surcharge = surcharge;
	}

	public void setShippingSurcharge (boolean surcharge) {
		this.surcharge = surcharge;
	}

	public String toJsonString() {
		return 
		"{\t\n" + 
		"\t\t\"deliveryZone\": \"" + deliveryZone + "\",\n" + 
		"\t\t\"surcharge\": " + surcharge + "\n" + 
		"\t}";
	}
}