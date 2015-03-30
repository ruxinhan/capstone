import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;


public class GenerateJson {
	public static void main(String args[]) throws FileNotFoundException {
		Scanner scanner = new Scanner(new File("concept_info_list3.csv"));
		PrintWriter pw = new PrintWriter(new File("flare_1.json"));
		int i = 0;
		pw.print("{\n" + 
				"\"name\": \"flare\"," + 
				"\"children\": [\n");
		scanner.nextLine();
		while (scanner.hasNext()) {
			String line = scanner.nextLine();
			String[] attrs = line.split(",");
			pw.print("\t{\"name\":\"");
			pw.print(attrs[0]);
			pw.print("\", \"size\":\"");
			pw.print((int)Double.parseDouble(attrs[3]));
			pw.println("\"},");
			i ++;
			if (i >= 100) {
				pw.println("]\n}");
				scanner.close();
				pw.close();
				break;
			}
		}
	}
}
