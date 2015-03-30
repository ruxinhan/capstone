import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.Scanner;

/**
 * Separate the csv file to txt files.
 * @author Rachel
 *
 */
public class CreateFiles {
	public static void main(String args[]) throws FileNotFoundException {
		Scanner scanner = new Scanner(new File("ohsumed-allcats.csv"));
		while (scanner.hasNext()) {
			String line = scanner.nextLine();
			int pos = line.indexOf(".");
			String filename = "";
			if (pos > 0) {
				filename = line.substring(0,pos);
				if (filename.length() > 100) {
					filename = filename.substring(0, 100);
				}
			} else {
				filename = line.substring(0, Math.min(100, line.length() - 1));
			}
			
			PrintWriter pw = new PrintWriter(new File("extracted_1/" + filename + ".txt"));
			pw.write(line);
			pw.close();;
		}
		scanner.close();
	}
}
