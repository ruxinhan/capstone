import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Data processing for the concept node csv file
 * @author Rachel
 *
 */
public class ConceptInfoProcessing {
	public static String value = "tf-idf"; // The value used in visualization
	
	public static void main(String args[]) throws FileNotFoundException {
		Scanner scanner = new Scanner(new File("concept_info.csv"));
		String[] title = scanner.nextLine().split(",");
		int pos = 0; // Position of the value in each line
		ArrayList<Double> arrayValues = new ArrayList<Double>();
		String outfilename1 = "powerlaw_out.csv";
		int numChartLabel = 40;
		int interval = 0;
		
		for (int i = 0; i < title.length; i ++) {
			if (title[i].equals(value)) {
				pos = i;
			}
		}
		
		while (scanner.hasNext()) {
			String line = scanner.nextLine();
			String[] values = line.split(",");
			arrayValues.add(Double.parseDouble(values[pos]));
		}
		scanner.close();
		
		// Write to file
		interval = arrayValues.size() / numChartLabel;
		PrintWriter pw = new PrintWriter(new File(outfilename1));
		pw.println("concept," + value);
		for (int i = 0; i < arrayValues.size(); i += interval) {
			pw.println(i+1 + "," + arrayValues.get(i));
		}
		pw.close();
	}
}
