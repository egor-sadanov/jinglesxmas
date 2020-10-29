/*
	This program converts csv rows into json objects
	The input .csv file must match the following pattern:
		postcode,suburb,state,dc,type,lat,lon
	
	User supposed to provide two file names in the arguments arguments.
	For example: java Library input.csv output.json
*/

import java.util.*;
import java.io.*;

public class PostcodeLibrary {
	private Map<String, DeliveryCentre> postcodeLibrary;

	public PostcodeLibrary() {
		postcodeLibrary = new HashMap<String, DeliveryCentre>();
	}

	public void scanCSV(String filename) throws IOException {
		try {
			Scanner rd = new Scanner(new FileReader(filename));
			rd.nextLine();
			while(rd.hasNext()) {
				String line = rd.nextLine();
				String[] tuples = line.split(",");
	
				String postcode = tuples[0].trim();

				String zone = "";
				switch(tuples[7].trim()) {
					case "N": zone = "north"; break;
					case "S": zone = "south"; break;
					case "W": zone = "west"; break;
					case "E": zone = "east"; break;
					case "C": zone = "center"; break;
					default: break;
				}
				boolean surcharge = tuples[8].trim().equals("1") ? true:false;

				postcodeLibrary.put(postcode, new DeliveryCentre(zone, surcharge));
			}
			rd.close();
		} catch(FileNotFoundException e) {
			System.out.println("Error: " + e);
		}
	}

	public void writeToJsonFile(String filename) throws IOException {
		PrintWriter pw = new PrintWriter(new File(filename));
	
		String[] output = new String[]{"{\n"};
		postcodeLibrary.entrySet()
		.stream()
		.sorted(Map.Entry.<String, DeliveryCentre>comparingByKey())
		.forEach((e) -> {
			output[0] += "\t\"" + e.getKey() + "\"" + ": " + e.getValue().toJsonString() + ",\n";
		});
		String out = output[0];
		out = out.substring(0, out.length()-2) + "\n}";
		pw.println(out);
		System.out.println("File " + filename + " has been successfully created");
		pw.close();
	}

	public static void main(String[] args) throws Exception {
		if (args.length < 2) {
			System.out.printf("\n%37s\n", "***Warning***");
			System.out.printf("%42s", "Not enough parameters\n");
			System.out.printf("%47s\n", "Check that you follow the pattern:");
			System.out.println("$ java PostcodeLibrary <input_file_name>.csv <output_file_name>.json\n");
		} else if (!args[0].contains(".csv")) {
			System.out.printf("\n%37s\n", "***Warning***");
			System.out.printf("%51s", "First argument must have .csv extension \n");
			System.out.printf("%47s\n", "Check that you follow the pattern:");
			System.out.println("$ java PostcodeLibrary <input_file_name>.csv <output_file_name>.json\n");

		} else if (!args[1].contains(".json")) {
			System.out.printf("\n%37s\n", "***Warning***");
			System.out.printf("%53s", "Second argument must have .json extension \n");
			System.out.printf("%47s\n", "Check that you follow the pattern:");
			System.out.println("$ java PostcodeLibrary <input_file_name>.csv <output_file_name>.json\n");
		}	else {
			PostcodeLibrary lib = new PostcodeLibrary();
			lib.scanCSV(args[0]);
			lib.writeToJsonFile(args[1]);
		}
	}
}