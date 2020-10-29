/*
	This file represents DeliveryCentre object as a template for conversion into json file
*/

public class DeliveryCentre {
	private String deliveryCentre;
	private String shippingOption;

	public DeliveryCentre (String deliveryCentre, String shippingOption) {
		this.deliveryCentre = deliveryCentre;
		this.shippingOption = shippingOption;
	}

	public void setShippingSurcharge (String shippingOption) {
		this.shippingOption = shippingOption;
	}
	
	public String toJsonString() {
		return 
		"{\t\n" + 
		"\t\t\"deliveryCentre\": \"" + deliveryCentre + "\",\n" + 
		"\t\t\"shippingOption\": \"" + shippingOption + "\"\n" + 
		"\t}";
	}
}