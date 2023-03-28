package ru.itone.ilp.common;

import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;

public final class OS {
    public enum OSType {
        WINDOWS, LINUX, MAC, SOLARIS, OTHER
    }

    public static final OSType CURRENT;
    private static final char[] INVALID_RESOURCE_CHARACTERS;
    private static final String[] INVALID_RESOURCE_BASENAMES;
    private static final String[] INVALID_RESOURCE_FULLNAMES;

    static {
        CURRENT = getOS();
        if (CURRENT == OSType.WINDOWS) {
            //valid names and characters taken from
            // http://msdn.microsoft.com/library/default.asp?url=/library/en-us/fileio/fs/naming_a_file.asp
            INVALID_RESOURCE_CHARACTERS = new char[]{'\\', '/', ':', '*', '?', '"', '<', '>', '|', 0x7f};
            INVALID_RESOURCE_BASENAMES = new String[]{"aux", "com1", "com2", "com3", "com4",
                "com5", "com6", "com7", "com8", "com9", "con", "lpt1", "lpt2",
                "lpt3", "lpt4", "lpt5", "lpt6", "lpt7", "lpt8", "lpt9", "nul", "prn"};
            Arrays.sort(INVALID_RESOURCE_BASENAMES);
            //CLOCK$ may be used if an extension is provided
            INVALID_RESOURCE_FULLNAMES = new String[]{"clock$"};
        } else {
            //only front slash and null char are invalid on UNIXes
            //taken from http://www.faqs.org/faqs/unix-faq/faq/part2/section-2.html
            INVALID_RESOURCE_CHARACTERS = new char[]{'/', '\0',};
            INVALID_RESOURCE_BASENAMES = null;
            INVALID_RESOURCE_FULLNAMES = null;
        }
    }

    private static OSType getOS() {
        String osName = System.getProperty("os.name").toLowerCase();
        if (osName.contains("win")) {
            return OSType.WINDOWS;
        } else if (osName.contains("nix") || osName.contains("nux")
            || osName.contains("aix")) {
            return OSType.LINUX;
        } else if (osName.contains("mac")) {
            return OSType.MAC;
        } else if (osName.contains("sunos")) {
            return OSType.SOLARIS;
        }
        return OSType.OTHER;
    }

    /**
     * Returns true if the given name is a valid resource name on this operating system,
     * and false otherwise.
     */
    public static boolean isNameValid(String name) {
        if (name == null)
            return false;
        //empty names are not valid
        final int length = name.length();
        if (length == 0)
            return false;
        //. and .. have special meaning on all platforms
        if (name.equals(".") || name.equals(".."))
            return false;
        final char lastChar = name.charAt(length - 1);
        // filenames ending in dot are not valid
        if (lastChar == '.')
            return false;
        // file names ending with whitespace are truncated (bug 118997)
        if (Character.isWhitespace(lastChar))
            return false;
        // should not contain invalid characters
        if (StringUtils.containsAny(name, INVALID_RESOURCE_CHARACTERS))
            return false;
        if (CURRENT == OSType.WINDOWS) {
            int dot = name.lastIndexOf('.');
            name = name.toLowerCase();
            //on Windows, filename suffixes are not relevant to name validity
            String basename = dot == -1 ? name : name.substring(0, dot);
            if (Arrays.binarySearch(INVALID_RESOURCE_BASENAMES, basename) >= 0)
                return false;
            return Arrays.binarySearch(INVALID_RESOURCE_FULLNAMES, name) < 0;
        }
        return true;
    }
}
